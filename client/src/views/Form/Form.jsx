const Form = ( )=>{
    return (
        <form>
        <h1>Create your new pokemon</h1>

        <div>
            <label>Nombre:  </label>
            <input type="text" />
        </div>

        <div>
            <label>Vida:  </label>
            <input type="text" />
        </div>

        <div>
            <label>Ataque:  </label>
            <input type="text" />
        </div>

        <div>
            <label>Defensa:  </label>
            <input type="text" />
        </div>

        <div>
            <label>Imagen:  </label>
            <input type="text" />
        </div>

        <button>CREATE</button>
        </form>
    )
}

export default Form