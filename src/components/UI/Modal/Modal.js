import './Modal.scss';

const modal = (data) => (

    `
    <div class="Modal">
        <article class="message is-danger">
            <div class="message-header">
                <p>Info</p>
            </div>
            <div class="message-body ww">
                ${data}
            </div>
        </article>
    </div>
    `
);

export default modal;