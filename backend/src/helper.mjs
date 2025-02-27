function splitName(name) {
    const splitName = name.split(" ");
    const first_name = splitName[0];
    let last_name = '';
    if (splitName.length >= 2) {
        last_name = splitName[splitName.length - 1];
    }
    return { first_name, last_name }
}

export default splitName;