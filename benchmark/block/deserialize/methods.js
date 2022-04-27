const {
    Blocks
} = require('@cauriland/crypto')

exports.deserialize = data => {
    return Blocks.Deserializer.deserialize(data)
}
