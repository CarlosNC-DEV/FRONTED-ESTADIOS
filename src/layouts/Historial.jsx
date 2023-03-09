import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Historial = () => {

    const [historial, setHistorial] = useState([]);
    const [estadios, setEstadios] = useState([]);
    const [equipo, setEquipo] = useState([]);

    const [idestadio, setIdestadio] = useState('');
    const [idequipo1, setIdequipo1] = useState('');
    const [idequipo2, setIdequipo2] = useState('');
    const [marcadorE1, setmarcadorE1] = useState();
    const [marcadorE2, setmarcadorE2] = useState();

    const URL = "http://localhost:3000/";
    const URL_ESTADIOS = "http://localhost:3000/historial/estadios"
    const URL_EQUIPOS = "http://localhost:3000/historial/equipos"

    useEffect(()=>{
        getHistorial();
        getEstadios();
        getEquipos();
    },[]);

    const getHistorial = async()=>{
        try {
            const respuesta = await axios.get(URL);
            setHistorial(respuesta.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getEstadios = async()=>{
        try {
            const respuesta = await axios.get(URL_ESTADIOS);
            setEstadios(respuesta.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getEquipos = async()=>{
        try {
            const respuesta = await axios.get(URL_EQUIPOS);
            setEquipo(respuesta.data);
        } catch (error) {
            console.log(error)
        }
    }

    const openModal = ()=>{
        try {
            setIdestadio('');
            setIdequipo1('');
            setIdequipo2('');
            setmarcadorE1();
            setmarcadorE2();
        } catch (error) {
            console.log(error);
        }
    }

    const crearJuego = async()=>{
        try {
            const resultado = await axios.post(URL,{idEstadio: idestadio, idEquipo1: idequipo1, idEquipo2:idequipo2, marcador:{E1:marcadorE1, E2:marcadorE2}});
            console.log(resultado.data);
            location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <div className='container m-3'>
                <div className='d-flex gap-3 justify-content-end'>
                    <a className='btn btn-success' href='/estadios'>Ver Estadios</a>
                    <a className='btn btn-success' href='/equipos'>Ver Equipos</a>
                    <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=> openModal()}>Crear Juego</button>
                </div>
                <table className='table text-center border mt-4'>
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
                                <td>{historial.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Crear nuevo juego</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className='container d-flex gap-4'>
                            <div>
                                <select name="estadio" id="estadio" onChange={(e)=> setIdestadio(e.target.value)}>
                                <option value="" disabled selected style={{color: "gray"}}>Seleccione el estadio</option>
                                    {estadios.map((estadios)=>(
                                        <option value={estadios._id}>{estadios.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <select name="equipo" id="equipo" onChange={(e)=> setIdequipo1(e.target.value)}>
                                <option value="" disabled selected style={{color: "gray"}}>Seleccione el equipo</option>
                                    {equipo.filter((equipo) => equipo._id !== idequipo2).map((equipo)=>(
                                        <option  key={equipo._id} value={equipo._id}>{equipo.nombre}</option>
                                    ))}
                                </select>

                                <select name="equipo" id="equipo" onChange={(e)=> setIdequipo2(e.target.value)}>
                                <option value="" disabled selected style={{color: "gray"}}>Seleccione el equipo</option>
                                    {equipo.filter((equipo) => equipo._id !== idequipo1).map((equipo)=>(
                                        <option value={equipo._id}>{equipo.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <div>
                                    <input type="number" placeholder='E1' value={marcadorE1} onChange={(e)=> setmarcadorE1(e.target.value)}/>
                                    <input type="number" placeholder='E2' value={marcadorE2} onChange={(e)=> setmarcadorE2(e.target.value)}/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onClick={()=> crearJuego()}>Guardar</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default Historial;
