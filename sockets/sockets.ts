import {Socket} from 'socket.io';



export const desconectar = (cliente:Socket)=>{
    cliente.on('disconecet',()=>{
        console.log('cliente desconectado')
    });
}

interface Payload {
    de: string,
    cuerpo:string 
}

export const mensaje = (cliente:Socket, io: SocketIO.Server) =>{

    //Escuchar mensaje
    cliente.on('mensaje',(payload:Payload)=>{

        console.log(`mensaje recibido ${payload.de } ${payload.cuerpo}` )

        io.emit('mensaje-nuevo', payload);
    })
}