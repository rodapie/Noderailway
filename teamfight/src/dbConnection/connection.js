import mongoose from 'mongoose';

const password = '8ks8FYyElnSl5r3C';
const dbname = 'Teamfight';
const uri = `mongodb+srv://gscamilo22:${password}@cluster1.7yaqacl.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const connection = () => mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default connection;