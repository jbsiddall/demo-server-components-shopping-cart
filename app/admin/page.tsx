import { prisma } from "../prisma"
import Link from "next/link"
import { TrashIcon } from '@heroicons/react/24/solid'
import { formDataToMap } from "../util"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const Validator = z.object({
    productId: z.string()
})

export const dynamic = 'auto';
export  const revalidate = 5

export default async function Admin() {
    const allProducts = await prisma.product.findMany()

    const deleteProduct = async (formData: FormData) => {
        'use server';
        const {productId} = Validator.parse(formDataToMap(formData))
        await prisma.product.delete({where: {id: parseInt(productId)}})
        revalidatePath('/admin')
    }

    return (
        <>
            <h2>Products</h2>
            <div className="not-prose self-end">
                <Link className="btn btn-primary" href="/admin/product/add">Add New Product</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allProducts.map(({id, name, price}) => (
                        <tr key={id} className="bg-base-200">
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{price}</td>
                            <td className="flex justify-end">
                                <form action={deleteProduct}>
                                    <input type='hidden' name='productId' value={id} />
                                    <button className="btn btn-error">
                                        <TrashIcon color="#FFF" width={16} height={16} />
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}