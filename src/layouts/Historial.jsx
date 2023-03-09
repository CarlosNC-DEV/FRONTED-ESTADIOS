import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdContentPasteOff } from 'react-icons/md';
import NavbarHis from '../components/NavbarHis';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'


const Historial = () => {

    const [historialfilter, setHistorialfilter] = useState([]);
    const [estadios, setEstadios] = useState([]);
    const [equipo, setEquipo] = useState([]);

    const [idestadio, setIdestadio] = useState('');
    const [idequipo1, setIdequipo1] = useState('');
    const [idequipo2, setIdequipo2] = useState('');
    const [marcadorE1, setmarcadorE1] = useState();
    const [marcadorE2, setmarcadorE2] = useState();

    const URL = "http://localhost:3000";
    const URL_ESTADIOS = "http://localhost:3000/historial/estadios"
    const URL_EQUIPOS = "http://localhost:3000/historial/equipos"

    useEffect(()=>{
        getEstadios();
        getEquipos();
        filtrarEquipos('');
    },[]);


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
            const respuesta = await axios.post(URL,{idEstadio: idestadio, idEquipo1: idequipo1, idEquipo2:idequipo2, marcador:{E1:marcadorE1, E2:marcadorE2}});
            if(respuesta.status === 200 && respuesta.data){
                // Muestra la alerta de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Registro Exitoso',
                    text: '¡Nuevo juego Agregado!',
                    showConfirmButton: false,
                    timer: 1500}).then(()=>{
                        window.location.href = '/'
                });
            }
        } catch (error) {
            if (error.response.status === 400) {
                Swal.fire({
                    title: 'Error',
                    text: error.response.data,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
    }

    const filtrarEquipos = async(idfilter)=>{
        try {
            const respuesta = await axios.get(`${URL}/${idfilter}`);
            setHistorialfilter(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarHistorial = async(idE)=>{
        try {
            Swal.fire({
            title: '¿Estas seguro/a?',
            text: "Si eliminas tu juego no abra vuelta atras!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar Juego!'
            }).then(async(result) => {
            if (result.isConfirmed) {
                const respuesta = await axios.delete(`${URL}/${idE}`);
                Swal.fire({
                    icon: 'success',
                    title: `${respuesta.data}`,
                    showConfirmButton: false,
                    timer: 1500}).then(()=>{
                        window.location.href = '/'
                });
            }
            })
        } catch (error) {
            if(error.respuesta.status === 400)
            Swal.fire({
                icon: 'error',
                title: `${error.respuesta.data}`,
                showConfirmButton: false,
                timer: 1500}).then(()=>{
                    window.location.href = '/'
            });
        }

    }

    return (
        <>
        <NavbarHis></NavbarHis>
            <div className='container my-3'>
            
                <div className='d-flex gap-3 justify-content-end'>
                    <a className='btn btn-success' href='/estadios'>Ver Estadios</a>
                    <a className='btn btn-success' href='/equipos'>Ver Equipos</a>
                    <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=> openModal()}>Crear Juego</button>
                </div>
                <table className='table text-center border mt-4'>
                    <thead className='border' style={{background: '#e9edee'}}>
                        <tr>
                            <th>
                            <select name="estadios" id="estadios" onChange={(e)=> filtrarEquipos(e.target.value)}>
                                <option value="" className='text-center'>Estadios</option>
                                {estadios.map((estadios)=>(
                                    <option key={estadios._id} value={estadios._id}>{estadios.nombre}</option>
                                ))}
                            </select>
                            </th>
                            <th>Equipo 1</th>
                            <th>|</th>
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
                            <th>Fecha y Hora</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historialfilter.map((historial)=>(
                            <tr key={historial._id}>
                                <td>{historial.estadio}</td>
                                <td>{historial.equipo1}</td>
                                <td>VS</td>
                                <td>{historial.equipo2}</td>
                                <td>
                                    <div className='d-flex justify-content-center gap-4'>
                                        <span>{historial.marcador.E1}</span>
                                        <span>-</span>
                                        <span>{historial.marcador.E2}</span>
                                    </div>
                                </td>
                                <td>{new Intl.DateTimeFormat('es-ES', { 
                                    year: 'numeric', 
                                    month: '2-digit', 
                                    day: '2-digit', 
                                    hour: 'numeric', 
                                    minute: '2-digit', 
                                    second: '2-digit', 
                                    hour12: true 
                                    }).format(new Date(historial.createdAt))}
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={()=>eliminarHistorial(historial._id)}><MdContentPasteOff/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Crear nuevo juego</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='container container-fluid'>
                            <div className='row'>
                                <div className='d-flex justify-content-center col-12 col-sm-12 col-lg-3 my-2'>
                                    <select name="estadio" id="estadio" onChange={(e)=> setIdestadio(e.target.value)}>
                                    <option value="" disabled defaultValue style={{color: "gray"}}>Seleccione el estadio</option>
                                        {estadios.map((estadios)=>(
                                            <option key={estadios._id} value={estadios._id}>{estadios.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='d-flex justify-content-center gap-2 col-12 col-sm-12 col-md-6 col-lg-6'>
                                    <select name="equipo" id="equipo" onChange={(e)=> setIdequipo1(e.target.value)}>
                                    <option value="" disabled defaultValue style={{color: "gray"}}>Seleccione el equipo</option>
                                        {equipo.filter((equipo) => equipo._id !== idequipo2).map((equipo)=>(
                                            <option  key={equipo._id} value={equipo._id}>{equipo.nombre}</option>
                                        ))}
                                    </select>

                                    <select name="equipo" id="equipo" onChange={(e)=> setIdequipo2(e.target.value)}>
                                    <option value="" disabled defaultValue style={{color: "gray"}}>Seleccione el equipo</option>
                                        {equipo.filter((equipo) => equipo._id !== idequipo1).map((equipo)=>(
                                            <option key={equipo._id} value={equipo._id}>{equipo.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='d-flex justify-content-center gap-2 col-12 col-sm-12 col-lg-3 my-2'>
                                    <input type="number" style={{width: '45px'}} placeholder='E1' value={marcadorE1} onChange={(e)=> setmarcadorE1(e.target.value)}/>
                                    <h1>-</h1>
                                    <input type="number" style={{width: '45px'}} placeholder='E2' value={marcadorE2} onChange={(e)=> setmarcadorE2(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={()=> crearJuego()}>Guardar</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default Historial;
