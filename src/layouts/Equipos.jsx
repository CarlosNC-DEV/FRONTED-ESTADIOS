import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { IoReloadSharp, IoAddOutline, IoPeopleOutline, IoPersonOutline, IoEarthOutline, IoLocationOutline } from 'react-icons/io5';


const Equipos = () => {

    
    const URL = "http://localhost:3000/historial/equipos"

    const [equipos, setEquipos] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [director, setDirector] = useState('');
    const [pais, setPais] = useState('');
    const [ciudad, setCiudad] = useState('');

    const [operacion, setOperacion] = useState(1);
    const [titulo, setTitulo] = useState('');

    useEffect(()=>{
        getEquipos()
    },[]);

    const getEquipos = async ()=>{
        try {
            const respuesta = await axios.get(URL);
            setEquipos(respuesta.data);
        } catch (error) {
            console.log(error)
        }
    }

    const openModal = async(op, id, nombre, director, pais, ciudad)=>{
        try {
            setOperacion()
            setTitulo('')
            setId('')
            setNombre('');
            setDirector('');
            setPais('');
            setCiudad('');
            if(op === 1){
                setOperacion(1);
                setTitulo("Agregar Nuevo equipo");
            }else if(op === 2){
                setOperacion(2);
                setTitulo("Actualizar Equipo");
                setId(id)
                setNombre(nombre);
                setDirector(director);
                setPais(pais);
                setCiudad(ciudad);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const opera = async()=>{
        if(operacion === 1){
            const respuesta = await axios.post(URL, { nombre: nombre, director:director, pais: pais, ciudad:ciudad });
            console.log(respuesta.data);
            location.reload();
        }else if(operacion===2){
            const respuesta = await axios.put(`${URL}/${id}`, { nombre: nombre, director:director, pais: pais, ciudad:ciudad });
            console.log(respuesta.data);
            location.reload();
        }
    }

    return (
        <>
        <Navbar></Navbar>
            <div className='container'>
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-primary mt-2 aling-items-center' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=> openModal(1)}><IoAddOutline style={{fontSize: '25px'}}/> Agregar Equipo</button>
                </div>
                <table className='table text-center border mt-4'>
                    <thead className='border' style={{background: '#e9edee'}}>
                        <th>Nombre</th>
                        <th>Director Tecnico</th>
                        <th>Pais</th>
                        <th>Ciudad</th>
                        <th>Actualizar</th>
                    </thead>
                    <tbody>
                        {equipos.map((equipos)=>(
                            <tr key={equipos._id}>
                                <td>{equipos.nombre}</td>
                                <td>{equipos.director}</td>
                                <td>{equipos.pais}</td>
                                <td>{equipos.ciudad}</td>
                                <td>
                                    <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=> openModal( 2, equipos._id, equipos.nombre, equipos.director, equipos.pais, equipos.ciudad )}><IoReloadSharp /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{titulo}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><IoPeopleOutline/></span>
                            <input type="text" class="form-control" placeholder="Nombre Equipo" aria-label="Nombre Equipo" value={nombre} onChange={(e)=> setNombre(e.target.value)}/>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><IoPersonOutline/></span>
                            <input type="text" class="form-control" placeholder="Director Tecnico" aria-label="Director Tecnico" value={director} onChange={(e)=> setDirector(e.target.value)}/>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><IoEarthOutline/></span>
                            <input type="text" class="form-control" placeholder="País" aria-label="País" value={pais} onChange={(e)=> setPais(e.target.value)}/>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><IoLocationOutline/></span>
                            <input type="text" class="form-control" placeholder="Ciudad" aria-label="Ciudad" value={ciudad} onChange={(e)=> setCiudad(e.target.value)}/>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onClick={()=> opera()}>Guardar</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default Equipos;
