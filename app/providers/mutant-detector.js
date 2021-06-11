module.exports = {
    isMutant: (dna) => {

        const eqLength = 4
        var seqFound = 0

        //validate(dna)

        var horizontalEqLength = (i, j) => {
            dna[i][j] === dna[i][j + 1]
                ? 1 + horizontalEqLength(i, j + 1)
                : 0
        }

        for (var i = 0; i <= dna.length; i++) {
            var row = dna[i]
            for (var j = 0; j <= row.length; j++) {

                seqFound += j + eqLength <= row.length && horizontalEqLength(i, j) >= eqLength
                if (seqFound > 1) return true



            }
        }


        
    }
}
