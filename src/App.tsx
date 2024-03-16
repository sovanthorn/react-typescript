import { useEffect, useState } from 'react'
import { Button, Modal } from 'flowbite-react';
import CardComponent from './Components/CardComponent';
import FormCreateProduct from './Components/FormCreateProduct';

function App(){

type Status = 'idle' | 'loading' | 'success' | 'error' 
type Product = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string 
};


  const [products, setProducts] = useState<Product[]>([])
  const [Status, setStatus]=useState<Status>('idle')
  const [openModal, setOpenModal] = useState(false);
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
   setStatus("loading")
   fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
   .then(data=>{ 
    console.log(data)
    setProducts(data);
    setStatus("success");
   }
   ).catch(err => {
   setStatus("error");
   console.error('Error fetching products:', err); 
   }
   );
  },[])
if(Status ==="loading"){
  return(
    <div className="grid place-content-center">
      <h1 className="text-6xl">Loading</h1>
    </div>
  );
}

function getDataForm(product:any){
  setDataForm(product);
}
const createProduct = ()=>{
  fetch("https://fakestoreapi.com/products",{
      method: "POST",
      body: JSON.stringify(dataForm),
      headers:{
        "Content-type": "application/json;",
      },
  }).then((res)=>res.json())
  .then((data)=> {
    console.log("Create product successfully")
    console.log(data);
  }).catch((err)=>{
    console.log(err);
  }
  )
  setOpenModal(false);
};
 
  return (
    <>
      <div className="my-6 flex justify-center">
      <Button onClick={() => setOpenModal(true)}>Create Product</Button>
      </div>
      <div className="container mx-auto grid grid-flow-row grid-cols-4 gap-4">
        {products.map(product => <CardComponent 
        key={product.id} 
        title={product.title} 
        image={product.image} 
        price={product.price}
        />
        )}
      </div>

      {/* Model */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create Product</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
        
         <FormCreateProduct getDataForm={getDataForm}/>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createProduct()}>
            Create
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
          Cancel
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  );
  };

export default App;
