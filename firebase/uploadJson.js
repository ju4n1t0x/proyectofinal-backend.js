const admin = require('firebase-admin');
const serviceAccount = require('./key_service_account.json');
const dataToUpload = require('./data.json');
const usersToUpload = require('./user.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const collectionName= 'products';
const collectionName2 = 'users';

async function importCollection(collectionName, data, itemType) {
    console.log(`Iniciando la importación de ${itemType} a la colección ${collectionName}`);
    let importedCount = 0;
    let errorCount = 0;

    for (const item of data) {
        try {
           
            const docRef = await db.collection(collectionName).add(item);
            console.log(`${itemType} importado con ID: ${docRef.id}`);
            importedCount++;
        } catch (error) { 
            console.error(`Error al importar el ${itemType}: ${error.message}`); 
            errorCount++;
        }
    }

    // Estas líneas ahora están dentro del cuerpo de la función
    console.log(`Importación de ${itemType} finalizada`);
    console.log(`Total de ${itemType}s importados: ${importedCount}`);
    console.log(`Total de errores: ${errorCount}`);

    return { importedCount, errorCount };
}


async function runAllImports(){
    try{
        await importCollection(collectionName, dataToUpload, 'products');
        await importCollection(collectionName2, usersToUpload, 'users');

        console.log("Las importaciones finalizaron con exito");
        process.exit(0);
}catch (overalError) {
    console.error(`Error al importar los datos: ${overalError.message}`);
    process.exit(1);

}
}


/*
async function importData(){
    console.log(`Iniciando la importacion de datos a la coleccion ${collectionName}`);
    let importedCount = 0;
    let errorCount = 0;

    for (const item of dataToUpload){
        try{
            const docRef = await db.collection(collectionName).add(item);
            console.log(`Documento improtado con ID: ${docRef.id}`);
            importedCount++;
        }catch (error) {
            console.error(`Error al importar el documento: ${error.message}`);
            errorCount++;
        }
    }

   

    process.exit(0);
}

const collectionName2 = 'users';

async function importUsers(){
    console.log(`Iniciando la importacion de usuarios a la coleccion ${collectionName2}`);
    let importerCount = 0;
    let errorCount = 0;

    for (const item of usersToUpload){
        try{
            const docRef = await db.collection(collectionName2).add(item);
            console.log(`Usuario importado con ID: ${docRef.id}`);
            importerCount++;
        }catch (error){
            console.error(`Error al impportar el usuario: ${error.message}`);
            errorCount++;
        }
    }

    console.log('Importacion de usuarios finalizada');
    console.log(`Total de usuarios importados: ${importerCount}`);
    console.log(`Total de errores: ${errorCount}`);
    process.exit(0);
}


importData();

importUsers();
*/

runAllImports();