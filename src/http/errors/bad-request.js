class BadRequest extends Error {
    constructor(props) {
        super(props);
        props.ctx.status = 403;
        props.ctx.body = { message: props.message || 'Bad request' };
    }
}

export { BadRequest };
