import React from 'react'
import './ControleFinanceiro.css'
import Navbar2 from '../components/Navbar2'
import {LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer} from "recharts";

function ControleFinanceiro() {

      const data = [
    { dia: "Seg", uso: 5 },
    { dia: "Ter", uso: 9 },
    { dia: "Qua", uso: 3 },
    { dia: "Qui", uso: 7 },
    { dia: "Sex", uso: 4 },
    { dia: "Sab", uso: 6 },
    { dia: "Dom", uso: 2 },
  ];
  return (
    
    
    <div className='controleFinanceiro-container'>
     
            <Navbar2/>
     

        <div className='transacoes-controleFinanceiro'>

            <div className='titulo-controleFinaceiro'>
             <h1>Controle Financeiro</h1>
            </div>
            <div className='informacoes-controleFinanceiro'>
                ola
                <br />
                ole
                <br />
                ta bom
                <br />
                <h5>ta bom ta bom</h5>
                <h6>nao sei oq é isso </h6>
                <h6>poxa vida </h6>
                <h6>e la vamos nos </h6>
            </div>
            
                 <div className='grafico-controleFinanceiro'>
                    <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip />
                    <Line
                     type="monotone"
                     dataKey="uso"
                     stroke="#5B88A5"
                     strokeWidth={3}
                     dot={{ r: 6 }}
                    />
                    </LineChart>
                    </ResponsiveContainer>
                    </div>
         
        </div>


    </div>
  )
}

export default ControleFinanceiro