const express = require('express')
const app = express()
const crypto =require('crypto')

app.use(express.json())


const products = 
    [
        {
            "id": "960a0fe9-d96a-49b8-a13c-9b2590c9d8dc",
            "name": "laptop",
            "price": 30000,
            "quantity": 2,
            "active": true
        },
        {
            "id": "960a0fe9-d96a-49b8-a13c-9b2590c9d8dd",
            "name": "keyboard",
            "price": 1000,
            "quantity": 4,
            "active": true
        },
        {
            "id": "960a0fe9-d96a-49b8-a13c-9b2590c9d8de",
            "name": "mouse",
            "price": 300,
            "quantity": 7,
            "active": false
        },
        {
            "id": "960a0fe9-d96a-49b8-a13c-9b2590c9d8df",
            "name": "Airpode",
            "price": 300,
            "quantity": "3",
            "active": true
        }
    ]

app.get('/',(request,response)=>{
    response.send('testingggggg')
})

app.get('/products',(request,response)=>{
    response.status(200).json(products)
})

app.post('/products',(req,res)=>{
    // console.log(req.body);
    // res.send('okkkk')
    const id= crypto.randomUUID()

    const { name,quantity ,price,active} =req.body
    products.push(
        {
            id,
            name,
            price, 
            quantity,
            active
        }
    )
    res.status(201).json({message:"successfully added"})
})
app.get('/products/:id',(req,res)=>{
    const product = products.find(item=>item.id==req.params.id)

    if(!product){
        return res.status(404).json({message:"item not found"})
    }

    
    res.status(200).json(product)
})
app.put('/products/:id',(req,res)=>{
    const product =products.find(item=>item.id==req.params.id)

    if(!product){
        return res.status(404).json({message:"item not found"})
    }
    const {name,quantity,price,active}=req.body
    if(name){
        product.name=name
    }
    if(quantity){
        product.quantity=quantity
    }
    if(price){
        product.price=price
    }
    if("active" in req.body){
        product.active=active
    }
    res.status(200).json({message:"product update success"})
})
app.delete('/products/:id',(req,res)=>{
    const productIndex = products.findIndex(item=>item.id==req.params.id)
    if(productIndex==-1){
        return res.status(404).json({message:"not data found"})
    }
    // console.log(productIndex);
    products.splice(productIndex,1)
    res.status(200).json({message:"product delete success"})
})


app.listen(3000,()=>console.log("server loaded on port 3000"))