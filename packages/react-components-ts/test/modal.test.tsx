import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import Modal from '../src/modal';
import Button from '../src/button';

describe('<Modal />', () => {

  it('should render a modal', () => {
    const modal = shallow(<Modal />);

    expect(modal.find('.rc-modal').length).to.equal(1);
  });

  it('should render a close link if onClose is provided', () => {
    const onClose = sinon.spy();
    const modal = shallow(<Modal onClose={onClose} />);

    expect(modal.find('.rc-modal-close').length).to.equal(1);
  });

  it('should render a title if provided', () => {
    const modal = shallow(
      <Modal>
        <Modal.Title>title</Modal.Title>
        <>Text</>
      </Modal>,
    );
    expect(modal.find('ModalTitle').children().text()).to.equal('title');
  });

  it('should render provided actions', () => {
    const button = <Button id="test-button">submit</Button>;

    const modal = shallow(
      <Modal>
        <Modal.Actions>{button}</Modal.Actions>
      </Modal>,
    );

    expect(modal.find('#test-button').prop('children')).to.equal('submit');
  });
});
