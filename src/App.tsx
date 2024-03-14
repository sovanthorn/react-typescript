import { useEffect, useState } from 'react'
import { Button } from 'flowbite-react';

type Status = 'idle' | 'loading' | 'success' | 'error' 
type product = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string 
}

  const [count, setCount]= useState(0)
  const [products, setProducts] = useState<product[]>([])
  const [Status, setStatus]=useState<Status>('idle')
 
  useEffect(() => {
   setStatus("loading")
   fetch('https://fakestoreapi.com/products/1').then(res
   =>res.json()).then(data=>{
    setProducts(data)
    setStatus("success")
   }).catch(err => {
    setStatus("error")
   })
  },[])
 
  return (
    <>
     <div className='h-screen grid place-content-center'>
      <h1 className='text-center'>{count}</h1>
      <Button onClick={() =>setCount(count+1 )}>This is button</Button>
      </div> 
        
    </>
  )
}

export default App
