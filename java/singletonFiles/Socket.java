//javac Socket.java
//java Socket

import java.net.*;
import java.io.*;

public class Socket{
    public static void main(String args[]){
        ServerSocket serverSocket = new ServerSocket(6868);
        Socket socket = serverSocket.accept(); // is like await, it waits until connection is established
        InputStream input = socket.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(input));
        String line = reader.readLine();    // reads a line of text

        //To-Do: return the returned line with some twist
        OutputStream output = socket.getOutputStream();

        System.out.println("Program finished");
    }
}