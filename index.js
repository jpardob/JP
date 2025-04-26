getval = (cards)=>{
    cards =cards.map(d=>{if(!d.toString().includes("-")){return d}let e=d.split("-")[1];return (isNaN(e))?e:parseInt(e)})
    return cards.sort((a,b)=>{if (b == "a") b = 100; return a-b}).reduce((acum,current)=>{return acum+((typeof current== "number")?current:["j","q","k"].includes(current)?10:(current!="a")?0:(acum+11<=21)?11:1)},0)
}


p=["a",2,3,4,5,6,7,8,9,10,"j","q","k"]
cards ={
    "d":p.slice(),
    "p":p.slice(),
    "c":p.slice(),
    "t":p.slice()
}

convertCard=(cards)=>Object.keys(cards).map(k=>cards[k].map(n=>k+"-"+n)).flat()

reConvertCard=(cardscon)=>{
    let r = {};
    cardscon.forEach(c=>{
        let t=c.split("-");
        if(!r[t[0]]){
            r[t[0]]=[]
        }
        r[t[0]].push(!isNaN(t[1])?parseInt(t[1]):t[1])
    })
    return r
}

arrayPopIndex = (a,i) => a.slice(0,i).concat(a.slice(i+1))

var ghistory=[cards]

getRandomCard = (cards) =>{
    let items = convertCard(cards);
    let index = Math.floor(Math.random()*items.length);
    let item = items[index]
    let ncards = reConvertCard(arrayPopIndex(items,index))
    ghistory.push(ncards)
    return item
} 
getSpecificCard = (cards,card)=>{
    let items = convertCard(cards);
    let index = items.indexOf(card);
    if(index==-1)return false;
    let item = items[index]
    let ncards = reConvertCard(arrayPopIndex(items,index))
    ghistory.push(ncards)
    return item
}
getCardsValue=(cards)=>Object.keys(cards).map(k=>cards[k].map(n=>n)).flat()
calcProb=(myCards,avaliableCards,rivalCards)=>{
    let rv = getval(rivalCards)
    let mv = getval(myCards)
    let acv = getCardsValue(avaliableCards)
    let pos = acv.map(v=>getval(myCards.concat(v)))
    let npos=pos.length
    let dpos = pos.filter(p=>p>21);
    let ndpos = dpos.length;
    let fpos = pos.filter(p=>p<=21&&p>rv)
    let nfpos = fpos.length
    return {probabilidad_ganar:nfpos/npos, probabilidad_perder:ndpos/npos}
}