import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
//import MongoClient from 'mongodb';
require('.env').config();
import ObjectId from 'mongodb';

//import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
const PORT =5000;
//app.use('/posts', postRoutes);


//https://wwww.mongodb.com/cloud/atlas 
process.env.CONNECTION_URI

//const PORT = process.env.PORT || 5000;

/*mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))*/
 // .catch((error) => console.log(`${error} did not connect`));
mongoose.connect(CONNECTION_URI)
.then(()=>{console.log(`Server Running on Port: http://localhost:${PORT}`)})
.catch((error) => console.log(`${error} did not connect`));


client.connect((err) => {
	const orders = client.db('Grow').collection('orders');
	console.log('Orders connection successfully');

	// Update Order Status
	app.post('/updateOrder', (req, res) => {
		const ap = req.body;
		orders.updateOne(
			{ _id: ObjectId(ap.id) },
			{
				$set: { status: ap.status, progress: ap.progress }
			},
			(err, result) => {
				if (err) {
					console.log(err);
					res.status(500).send({ message: err });
				} else {
					res.send(result.modifiedCount > 0);
					console.log(result);
				}
			}
		);
	});

	// Update Order details
	app.post('/updateOrderDetails', (req, res) => {
		const od = req.body;
		orders.updateOne(
			{ _id: ObjectId(od.id) },
			{
				$set: { shipment: od.shipment, products: od.products, price: od.price }
			},
			(err, result) => {
				if (err) {
					console.log(err);
					res.status(500).send({ message: err });
				} else {
					res.send(result.modifiedCount > 0);
					console.log(result);
				}
			}
		);
	});

	// Added Place Order
	app.post('/addOrders', (req, res) => {
		const newOrder = req.body;
		orders.insertOne(newOrder).then((result) => {
			res.send(result.insertedCount > 0);
		});
		// console.log(newOrder);
	});

	// Get specific user Orders
	app.get('/orders', (req, res) => {
		// console.log(req.query.email);
		orders.find({ email: req.query.email }).toArray((err, documents) => {
			res.send(documents);
		});
	});

	// Get all Orders
	app.get('/allOrders', (req, res) => {
		orders.find({}).toArray((err, documents) => {
			res.send(documents);
		});
    });
    
    
});

client.connect((err) => {
	const products = client.db('Grow').collection('products');
	console.log('Products connection successfully');

	// Update Product Information
	app.post('/updateProduct', (req, res) => {
		const pd = req.body;
		products.updateOne(
			{ _id: ObjectId(pd.id) },
			{
				$set: { name: pd.name, price: pd.price }
			},
			(err, result) => {
				if (err) {
					console.log(err);
					res.status(500).send({ message: err });
				} else {
					res.send(result.modifiedCount > 0);
					console.log(result);
				}
			}
		);
	});

	// Get all products
	app.get('/products', (req, res) => {
		products.find({}).toArray((err, documents) => {
			res.send(documents);
		});
	});

	// Add Products in inventory
	app.post('/addProducts', (req, res) => {
		const allProduct = req.body;
		products.insertOne(allProduct).then((result) => {
			console.log(result.insertedCount);
			res.send(result.insertedCount > 0);
		});
	});

	// Delete Product
	app.delete('/deleteProducts/:id', (req, res) => {
		console.log(req.params.id);

		products.deleteOne({ _id: ObjectId(req.params.id) }).then((result) => {
			res.send(result.deletedCount > 0);
		});
    });
    

});

// Root Route
app.get('/', (req, res) => {
	res.send('Welcome to Grow');
});

// PORT
app.listen(process.env.PORT || port, () => {
	console.log('listening on port');
});


