const express = require('express')
const cors = require('cors')
const connectDB = require('./config/dbConnection')
const dotenv = require('dotenv').config()
const userDetails = require('./model/userModels')
const productDetails = require('./model/productModels')




const accountSid = 'AC5d7bba2f55ca7e7bdd1e9fae4177464f';
const authToken = 'f648b054a4032c77ee10dcff26cab401';
const client = require('twilio')(accountSid, authToken);





connectDB()
const app = express()
const PORT = process.env.PORT || 8001

app.use(cors())
app.use(express.json({limit : '10mb'}))

function sendMessageOnPurchase(cartItems){
    const adminPhoneNumber = '+2349032520207'; // Admin's WhatsApp number

    client.messages
        .create({
        body: `New Order: ${JSON.stringify(cartItems)}`,
        from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
        to: `whatsapp:${adminPhoneNumber}`,
        })
        .then((message) => console.log(`Message sent: ${message.sid}`))
        .catch((error) => console.error(`Error sending message: ${error.message}`));
}

app.get('/', (req, res) => {
    res.send('Server is running')
})


//signup
app.post('/signup', async(req, res) => {
    console.log(req.body) //data coming in from the signUp page
    const {email} = req.body

        try{
            const checkEmail = await userDetails.findOne({email})

            if(checkEmail){
                return res.status(400).json({ message: 'Email already exists. Proceed to Login' });
            }else{
                const user = await userDetails.create(req.body)
                console.log('Succefully signup')
                return res.status(200).json({ message: 'Succefully signup. Proceed to Login' });
            }
        }catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error in signup' });
        } 
})


//login
app.post('/login', async(req, res) =>{
//data coming in from the login page

    const {email, password} = req.body

    const checkUser = await userDetails.findOne({email})

    try{
        if(checkUser){
            const checkedPassword = await userDetails.findOne({password})

            if(checkedPassword){
                const dataSend = {
                    _id: checkUser._id,
                    firstName: checkUser.firstName,
                    lastName: checkUser.lastName,
                    email: checkUser.email,   
                    profileImage: checkUser.profileImage
                }
                return res.status(200).json({ message: 'Succefully login', data: dataSend }); 
            }else{
                return res.status(400).json({message: 'User not register. Proceed to signup'})
            }  
        }else{
            return res.status(400).json({message: 'User not register. Proceed to signup'})
        }
    }catch(error){
        res.status(500).json({ message: 'Error in Login' });
    }
})

//upload new product
app.post('/newProduct', async(req, res)=>{

    const product = await productDetails.create(req.body)
    res.send({message: 'Uploaded successfully'})
})

//get product
app.get('/product', async(req,res)=>{
    const products = await productDetails.find({})
    
    res.send(JSON.stringify(products))
})

app.post('/purchase', (req,res) => {
    const purchase = req.body
    
    let cartItems = [];

    for (let i = 0; i < purchase.length; i++) {
        const cartItemsArray = {
            _id: purchase[i]._id,
            name: purchase[i].name,
            price: purchase[i].price,
            category: purchase[i].category
        };

        cartItems.push(cartItemsArray);
    }
    
    console.log(cartItems)

    sendMessageOnPurchase(cartItems)
    res.status(200).json({ message: 'Order place successfully' });
})

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
})