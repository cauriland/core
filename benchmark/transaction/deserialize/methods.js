const {
    Transactions
} = require('@cauriland/crypto')

exports.deserialize = data => {
    return Transactions.Deserializer.deserialize(data)
}
