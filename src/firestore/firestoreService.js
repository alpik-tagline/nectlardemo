// import firestore from '@react-native-firebase/firestore';

// const existingProductsData = [
//   {
//     productId: 'P001',
//     name: 'Organic Apples',
//     image: 'url_to_apples',
//     quantity: 50,
//   },
//   {
//     productId: 'P002',
//     name: 'Fresh Bananas',
//     image: 'url_to_bananas',
//     quantity: 100,
//   },
//   {
//     productId: 'P003',
//     name: 'Sweet Oranges',
//     image: 'url_to_oranges',
//     quantity: 75,
//   },

// ];

// const storeExistingProductsInFirestore = async () => {
//   const productsCollection = firestore().collection('products');

//   for (const product of existingProductsData) {
//     try {
//       await productsCollection.doc(product.productId).set(product);
//       console.log(`Product with ID ${product.productId} stored successfully.`);
//     } catch (error) {
//       console.error(
//         `Error storing product with ID ${product.productId}: `,
//         error,
//       );
//     }
//   }

//   console.log('Finished attempting to store all existing products.');
// };

// storeExistingProductsInFirestore();
