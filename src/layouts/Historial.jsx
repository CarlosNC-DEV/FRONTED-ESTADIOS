import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Historial = () => {

    const [historial, setHistorial] = useState([]);

    const URL = "http://localhost:3000/";

    useEffect(()=>{
        getHistorial()
    },[]);

    const getHistorial = async()=>{
        try {
            const respuesta = await axios.get(URL);
            setHistorial(respuesta.data);
        } catch (error) {
            console.log(error)
        }
    }

    console.log(historial);
    
    return (
        <>
            <div className='container m-3'>
                <div className='d-flex gap-3 justify-content-end'>
                    <button className='btn btn-success'>Ver Estadios</button>
                    <button className='btn btn-success'>Ver Equipo</button>
                    <button className='btn btn-primary'>Crear Juego</button>
                </div>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>Estadio</th>
                            <th>Equipo 1</th>
                            <th>Equipo 2</th>
                            <th>
                                    <div>
                                        <p>Marcador</p>
                                    </div>
                                    <div className='d-flex justify-content-center gap-4'>
                                        <span>E1</span>
                                        <span>-</span>
                                        <span>E2</span>
                                    </div>
                            </th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial.map((historial)=>(
                            <tr key={historial._id}>
                                <td>{historial.estadio}</td>
                                <td>{historial.equipo1}</td>
                                <td>{historial.equipo2}</td>
                                <td>
                                    <div className='d-flex justify-content-center gap-4'>
                                        <span>{historial.marcador.E1}</span>
                                        <span>-</span>
                                        <span>{historial.marcador.E2}</span>
                                    </div>
                                </td>
                                <td>{historial.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default Historial;
