import {z} from "zod"
import { formDataToMap } from "../../../../util";
import { prisma } from "../../../../prisma";
import { redirect  } from 'next/navigation';
import {Route} from "nextjs-routes"


const Validator = z.object({
    id: z.string(),
    name: z.string(),
    price: z.string().refine(x => {
        try {
            parseFloat(x)
        } catch(e) {
            return false
        }
        return true
    }, "price must be number").transform(parseFloat)
})

type Query = (Route & {pathname: '/admin/edit-product/[id]'})['query']
export default async function EditProduct({params: {id}}: {params: Query}) {
    const product = await prisma.product.findFirstOrThrow({where: {id: parseInt(id)}})

    async function editProduct(data: FormData) {
        'use server';
        const {id, name, price} = Validator.parse(formDataToMap(data))
        await prisma.product.update({data: {
            name,
            price,
        }, where: {id: parseInt(id)}})
        redirect('/admin')
    }

    return (
        <form action={editProduct} className="flex flex-col">
            <input type='hidden' name='id' value={id} />
            <input type='text' name='name' placeholder="Product Name" className="input input-bordered" defaultValue={product.name} />
            <input type='text' name='price' placeholder="Price" className="input input-bordered" defaultValue={product.price} />
            <button className="btn" type="submit">Save</button>
        </form>
    )
}
