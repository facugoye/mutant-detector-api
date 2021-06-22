const eqLengthSearch = 4
const maxSequences = 2

module.exports = {
    dna: _ => {
        dna = _
        var seqFound = 0

        var validate = () => {
            var errors = []

            for (let i = 0; i < dna.length; i++) {
                if (dna[i].length !== dna.length)
                    errors.push("La matriz debe ser cuadrada.")

                if (!RegExp(/^[ATCG]*$/).test(dna[i]))
                    errors.push("Solo los caracteres A, C, T y G son validos")
            }

            return errors
        }

        var isMutant = () => searchHorizontal() || searchVertical() || searchDiagonalR() || searchDiagonalL()

        var enoughItemsAtBottom = i => i + eqLengthSearch <= dna.length
        var enoughItemsAtRight = j => j + eqLengthSearch <= dna.length
        var enoughItemsAtDiagonalR = (i, j) => enoughItemsAtBottom(i) && enoughItemsAtRight(j)
        var enoughItemsAtDiagonalL = (i, j) => enoughItemsAtBottom(i) && j >= (eqLengthSearch - 1)

        var horizontalEqLength = (i, j) =>
            dna[i][j] === dna[i][j + 1]
                ? 1 + horizontalEqLength(i, j + 1)
                : 1

        var verticalEqLength = (i, j) =>
            dna[i + 1] !== undefined
                && dna[i][j] === dna[i + 1][j]
                ? 1 + verticalEqLength(i + 1, j)
                : 1

        var diagonalREqLength = (i, j) =>
            dna[i + 1] !== undefined
                && dna[i + 1][j + 1] !== undefined
                && dna[i][j] === dna[i + 1][j + 1]
                ? 1 + diagonalREqLength(i + 1, j + 1)
                : 1

        var diagonalLEqLength = (i, j) =>
            dna[i + 1] !== undefined
                && dna[i + 1][j - 1] !== undefined
                && dna[i][j] === dna[i + 1][j - 1]
                ? 1 + diagonalLEqLength(i + 1, j - 1)
                : 1

        var searchHorizontal = () => {
            for (let i = 0; i < dna.length; i++) {
                for (let j = 0; enoughItemsAtRight(j); j++) {

                    var eqLength = horizontalEqLength(i, j)
                    if (eqLength >= eqLengthSearch)
                        seqFound++
                    if (seqFound >= maxSequences)
                        return true

                    j += eqLength - 1
                }
            }

            return false
        }

        var searchVertical = () => {
            for (let j = 0; j < dna.length; j++) {
                for (let i = 0; enoughItemsAtBottom(i); i++) {

                    var eqLength = verticalEqLength(i, j)
                    if (eqLength >= eqLengthSearch)
                        seqFound++
                    if (seqFound >= maxSequences)
                        return true

                    i += eqLength - 1
                }
            }

            return false
        }

        var searchDiagonalR = () => {
            for (let i = 0; enoughItemsAtBottom(i); i++) {
                for (let j = 0; enoughItemsAtRight(j); j++) {

                    if (i > 0 && j > 0)
                        break

                    for (let z = 0; enoughItemsAtDiagonalR(i + z, j + z); z++) {

                        var eqLength = diagonalREqLength(i + z, j + z)
                        if (eqLength >= eqLengthSearch)
                            seqFound++
                        if (seqFound >= maxSequences)
                            return true

                        z += eqLength - 1
                    }
                }
            }

            return false
        }

        var searchDiagonalL = () => {
            for (let i = 0; enoughItemsAtBottom(i); i++) {
                for (let j = eqLengthSearch - 1; j < dna.length; j++) {

                    if (i > 0)
                        j = dna.length - 1

                    for (let z = 0; enoughItemsAtDiagonalL(i + z, j - z); z++) {

                        var eqLength = diagonalLEqLength(i + z, j - z)
                        if (eqLength >= eqLengthSearch)
                            seqFound++
                        if (seqFound >= maxSequences)
                            return true

                        z += eqLength - 1
                    }
                }
            }

            return false
        }

        return {
            validate: validate,
            isMutant: isMutant,
            horizontalEqLength: horizontalEqLength,
            verticalEqLength: verticalEqLength,
            diagonalREqLength: diagonalREqLength,
            diagonalLEqLength: diagonalLEqLength,
            enoughItemsAtRight: enoughItemsAtRight,
            enoughItemsAtBottom: enoughItemsAtBottom,
            enoughItemsAtDiagonalR: enoughItemsAtDiagonalR,
            enoughItemsAtDiagonalL: enoughItemsAtDiagonalL,
            searchHorizontal: searchHorizontal,
            searchVertical: searchVertical,
            searchDiagonalR: searchDiagonalR,
            searchDiagonalL: searchDiagonalL
        }
    }
}
