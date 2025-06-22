class NotAuthorized extends Error {
  constructor(props) {
    super(props);
    props.ctx.status = 401;
    props.ctx.body = { message: props.message || 'user not authorized' };
  }
}

export { NotAuthorized };
