import React, { useState } from 'react';
import ActifSelector from './ActifSelector';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import logo_calendar from '../assets/icons/schedule_calendar_flat_style.jpg';
import logo_money from '../assets/icons/money_flat.png';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Plot from 'react-plotly.js';

const PortFolioBuilder = () => {
    // states
    const [plotData, setPlotData] = useState(null);

    // Form states
    const [dateDebut, setDateDebut] = useState('2010-01-01');
    const [dateFin, setDateFin] = useState('2020-01-01');

    const [investInit, setInvestInit] = useState(10000);
    const [investRecu, setInvestRecu] = useState(2000);

    const [listActifs, setListActifs] = useState([]);
    const [inputActif, setInputActif] = useState('');

    const fetch_data = () => {
        const query_params = {
          "dateDebut": dateDebut,
          "dateFin": dateFin,
          "investInit": investInit,
          "investRecu": investRecu,
          "listActifs": listActifs,
        };
    
        axios.post('http://localhost:5000/api/get_all_data', query_params)
          .then((result) => {
            // console.log(result.data)
            if (result.data.success=='true'){
                if (result.data.json_figures){
                    const json_figures=Object.fromEntries(
                        Object.entries(result.data.json_figures).map(([key, value]) => [key, JSON.parse(value)])
                    );
                    console.log(json_figures)
                    setPlotData(json_figures)
                }
            }else{
                console.log("error while fetching the data")
            }

          })
          .catch((error) => {
            if (error.response) {
            //   setError(`Server responded with an error: ${error.response.status}`);
            } else if (error.request) {
            //   setError('No response received from the server.');
            } else {
            //   setError(`Error setting up the request: ${error.message}`);
            }
        });
    }

    const get_figures = () => {
        if(plotData!=null){
            return(
                <div className="w-75 d-flex flex-column">
                    {
                        Object.entries(plotData).map(([plot_name, plot]) => (
                            <Plot
                                data={plot.data}
                                layout={plot.layout}
                                // config={plotData.config}
                            />
                        ))
                    }
                </div>
            );
        }
        else{
            return(null);
        }
    }

    return(
        <div className="mb-5 d-flex flex-column align-items-center">
            <ActifSelector listActifs={listActifs} setListActifs={setListActifs} inputActif={inputActif} setInputActif={setInputActif}/>
            <Form className="m-5 d-flex flex-row">
                <div className="w-50 d-flex flex-row justify-content-around align-items-center border-end">
                    <img src={logo_calendar} alt="Logo Calendar" className="logo_calendar"/>
                    <div className="d-flex flex-column w-50">
                        <Form.Group className="w-75 mb-4">
                            <Form.Label>Date de début</Form.Label>
                            <Form.Control type="date" id="portfolio_form_date_debut" value={dateDebut} onChange={(e)=>setDateDebut(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className="w-75">
                            <Form.Label>Date de fin</Form.Label>
                            <Form.Control type="date" id="portfolio_form_date_fin" value={dateFin} onChange={(e)=>setDateFin(e.target.value)}></Form.Control>
                        </Form.Group>
                    </div>
                </div>
                <div className="w-50 d-flex flex-row justify-content-around align-items-center">
                    <img src={logo_money} alt="Logo Calendar" className="logo_money"/>
                    <div className="d-flex flex-column">
                        <Form.Group className="mb-4">
                            <Form.Label>Investissement initial</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" id="portfolio_form_invest_init" value={investInit} onChange={(e)=>setInvestInit(e.target.value)}></Form.Control>
                                <InputGroup.Text>USD</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Investissement récurrent (mensuel)</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" id="portfolio_form_invest_recu" value={investRecu} onChange={(e)=>setInvestRecu(e.target.value)}></Form.Control>
                                <InputGroup.Text>USD</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </div>
                </div>
            </Form>
            <Button onClick={()=>{fetch_data()}} className="custom_button">Générer l'analyse</Button>
            {get_figures()}
        </div>
    );
};

export default PortFolioBuilder;