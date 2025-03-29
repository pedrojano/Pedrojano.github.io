function radar(){
    let velo = document.getElementById('velo');
    let vel = Number(velo.value);
    let output = document.getElementById('radar');

    if(vel >= 61){
        output.innerHTML = `Você ultrapassou a velocidade permitida. MULTADO!`;
    } else{
        output.innerHTML = `Dirija sempre usando o cinto de segurança, Boa Viagem!`;
    }

}


