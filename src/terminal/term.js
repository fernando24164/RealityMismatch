function createTerminal() {
    Terminal.applyAddon(attach);
    Terminal.applyAddon(fit);

    return new Terminal();
}

function attachTerminal(id, term) {
    const container = document.getElementById(id);
    term.open(container);
    term.write("M1sm4cth R34l1ty 💀");
}

function wsURL() {
    const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    const port = location.port ? `:${location.port}` : '3000';
    const location_service = location.hostname ? `${location.hostname}` : 'localhost';
    return `${protocol}${location_service}${port}/ws`;
}

function wsConnection(url, term) {
    const socket = new WebSocket(url);
    socket.onopen = () => {term.attach(socket);};
    return socket;
}

attachTerminal('terminal', createTerminal())
const socketUrl = wsURL()
console.log(socketUrl);
// const terminalConnection = wsConnection(wsURL(), term)
// setTimeout(() => {
//     terminalConnection.close()
// }, 10000);