import {z} from "zod"
import { formDataToMap } from "../../../util";
import { prisma } from "../../../prisma";
import { redirect  } from 'next/navigation';


const Validator = z.object({
    name: z.string(),
    price: z.string().refine(x => {
        let result: number
        try {
            result = parseFloat(x)
        } catch(e) {
            return false
        }
        if (Number.isNaN(result)) {
            return false
        }
        return true
    }, "price must be number").transform(parseFloat)
})

export default function AddProduct() {

    async function addProduct(data: FormData) {
        'use server';
        const newProductInfo = Validator.safeParse(formDataToMap(data))
        if (newProductInfo.success) {
            await prisma.product.create({data: newProductInfo.data})
            redirect('/admin')
        }
    }

    return (
        <form action={addProduct} className="flex flex-col">
            <input type='text' name='name' placeholder="Product Name" className="input input-bordered" />
            <input type='text' name='price' placeholder="Price" className="input input-bordered" />
            <button className="btn" type="submit">Submit</button>
        </form>
    )
}
