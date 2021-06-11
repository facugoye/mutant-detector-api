 dna = undefined

var horizontalEqLength = (i, j) =>  dna[i][j] === dna[i][j + 1]
        ? 1 + horizontalEqLength(i, j + 1)
        : 1

module.exports = {
    dna: _ => dna = _,
    horizontalEqLength: horizontalEqLength,
    isMutant: (dna) => {

        const eqLength = 4
        var seqFound = 0

        //validate(dna)

        for (var i = 0; i <= dna.length; i++) {
            var row = dna[i]
            if(row)
                for (var j = 0; j <= row.length; j++) {

                    seqFound += j + eqLength <= row.length && horizontalEqLength(i, j) >= eqLength
                    if (seqFound > 1) return true

                }
        }

        return false        
    }
}
