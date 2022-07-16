
export const calcTime = (mlsec) => {
    let seconds = Math.floor( (mlsec/1000) % 60 );
    let minutes = Math.floor( (mlsec/1000/60) % 60 );
    let hours = Math.floor( (mlsec/(1000*60*60) % 24));
    return `${hours < 10 ? '0': ''}${hours}:${minutes < 10 ? '0': ''}${minutes}:${seconds < 10 ? '0': ''}${seconds}`
}

export const getRandom = (min, max) =>  {
    return Math.floor(Math.random() * (max - min)) + min
}

