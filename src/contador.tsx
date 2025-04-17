import { useEffect, useState } from "react";


export default function Contador(){
    const [count, setCount] = useState<number>(0);
    const [increment, setIncrement] = useState<number>(1);
    const actualizarContador=(valor:number)=>{
        setCount(count +valor);
        
    }
    
    const handleRest =(e: React.ChangeEvent<HTMLInputElement>)=>{
        
        setIncrement(Number(e.target.value));
    }
    const iniciarContador=()=>{
        setCount(0)
        
    }
    useEffect(()=>{
        if(count > 0){
            document.body.style.background= "#cce5ff";
        }else if(count === 0){
            document.body.style.background="#ccffcc";
        }else{
            document.body.style.backgroundColor =   "#ffcccc";
        }
    });
    return(
        <>
        <h2>Valor actual: {count}</h2>
  
        <div>
          <label>
            Incremento: 
            <input
              type="number"
              value={increment}
              onChange={handleRest}
            />
          </label>
        </div>
  
        <button onClick={() => actualizarContador(increment)}>Aumentar</button>
        <button onClick={() => actualizarContador(-increment)}>Restar</button>
        <button onClick={() => iniciarContador()}>Reset</button>
      </>
    );
    
}

