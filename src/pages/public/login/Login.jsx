export default function Login(){
    return(
        <section>
            <h1 className={'titulo'}>Login</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="inputLogin" className="form-label">Login</label>
                    <input type="email" className="form-control" id="inputLogin"/>

                </div>
                <div className="mb-3">
                    <label htmlFor="inputSenha" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="inputSenha"/>
                </div>
                <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
        </section>
    )
}