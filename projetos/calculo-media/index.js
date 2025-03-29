function media() {
    let nome = document.getElementById('nome').value;
    let turma = document.getElementById('turma').value;
    let nota1 = Number(document.getElementById('nota1').value);
    let nota2 = Number(document.getElementById('nota2').value);
    let nota3 = Number(document.getElementById('nota3').value);
    let nota4 = Number(document.getElementById('nota4').value);

    let resul = (nota1 + nota2 + nota3 + nota4) / 4;
    let resu = resul;

    if (nome, turma, nota1, nota2, nota3, nota4 <= 0){
        document.getElementById('resultado').innerHTML = `Por favor verifique suas informações!`
    }else{
        if (resu >= 70) {
            document.getElementById('resultado').innerHTML = (`Olá ${nome}, Turma ${turma}!<br> Sua media final foi ${resu} e você foi APROVADO!`)
         } else if (resu >= 60) {
             document.getElementById('resultado').innerHTML = (`Olá ${nome}, Turma ${turma}! <br> Sua media final foi ${resu} e você está de RECUPERAÇÂO!`)
         } else{
             document.getElementById('resultado').innerHTML = (`Olá ${nome}, Turma ${turma}! <br>Sua media final foi ${resu} e você foi Reprovado!`)
         }
    }
}


