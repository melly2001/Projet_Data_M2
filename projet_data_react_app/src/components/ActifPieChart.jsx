import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const ActifPieChart = ({listActifs, compute_sum_pourcent}) => {
    const getPieData = () => {

        var pieData = [
            {
            type: 'pie',
            values: listActifs.filter((actif)=>actif.pourcent>0).map((actif)=>actif.pourcent),
            labels: listActifs.filter((actif)=>actif.pourcent>0).map((actif)=>actif.nom),
            textinfo: 'label+percent',
            textposition: 'outside',
            hole: 0.4,
            },
        ];

        if (compute_sum_pourcent()<100){
            pieData[0].values=[...pieData[0].values,100-compute_sum_pourcent()]
            pieData[0].labels=[...pieData[0].labels,"Non sélectionné"]
        }

        return pieData;
    };

    return(
        <div>
            <Plot
                data={getPieData()}
                layout={{
                    title: 'Répartition des actifs',
                    showlegend: true,
                }}
            />
        </div>
    );
};

export default ActifPieChart;