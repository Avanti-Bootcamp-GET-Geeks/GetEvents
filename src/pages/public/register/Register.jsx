export default function Register() {
    return (
        <section>
            <h1 className={'titulo'}>Cadastre-se</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="inputName" placeholder='Digite seu nome' required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder='Digite email' required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputTelefone" className="form-label">Telefone</label>
                    <input type="text" className="form-control" id="inputTelefone" placeholder='Digite seu telefone'
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputSenha" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="inputSenha" placeholder='Digite sua senha'
                           required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputCargo" className="form-label">Cargo</label>
                    <input type="email" className="form-control" id="inputCargo" placeholder='Digite seu cargo'
                           required/>
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="isAdmin"/>
                    <label className="form-check-label" htmlFor="isAdmin">Admin</label>
                </div>

                <button type="submit" className="btn btn-success">Criar</button>

            </form>

        </section>
    )
}