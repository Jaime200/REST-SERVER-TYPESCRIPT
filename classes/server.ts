import express from "express"
import { SERVER_PORT } from "../global/environment";
import socketIO from 'socket.io'
import http from 'http'
import * as miSocket from '../sockets/sockets'
export default class Server {
    private static _instance:Server
    public app:express.Application;
    public port:number;
    public io:socketIO.Server
    private httpServer:http.Server

    private constructor(){
        
        this.app = express();          
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);  
        this.escucharSockets();
    }

    private escucharSockets(){
        console.log(`escuchando conexiones - sockets`);
        this.io.on('connection', client => {
            console.log(`Cliente conectado`)
                        
            //mensaje
            miSocket.mensaje(client, this.io);

            //desconectar;
            miSocket.desconectar(client);
            
        })
    }

    start(callback:Function){
    this.httpServer.listen(this.port,callback);
    }
    
    public static get instance(){
            return this._instance || (this._instance = new this) 
    }


}