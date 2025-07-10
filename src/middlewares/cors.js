import cors from 'cors';

export const corsMiddleware = ()=>cors({
    origin: (origin, callback)=>{
        const ACCEPTED_ORIGINS = [
            'http://localhost:1234',
            'http://localhost:8080',
            'http://movie.com'
        ]
        if(ACCEPTED_ORIGINS.includes(origin)){
            callback(null, true);
        }if(!origin){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    }
});



export default corsMiddleware;