import React, { Component, PropTypes  } from 'react';
import { connect } from 'react-redux';
import { Form, reduxForm, formValueSelector, Field } from 'redux-form';
import { createRepInfo } from '../actions/index';
import { Link } from 'react-router';
import { Select, Button, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import Header from './header';
import PhoneNumber from './form_components/phone_number.js';
import InputComponent from './form_components/input_components.js';
import AntdComponent from './form_components/antd_components.js';
import { isValidDOB, isValidPhoneNumber, isValidState, isValidZip, isValidExamDate } from '../helpers';

class PostProfile extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    onSubmit(props) {
        this.props.createRepInfo(props)
            .then(() => {
                // exams post has been created, navigate the user to the index
                // we navigate by calling this.context.router.push
                this.context.router.push('/profile/');
            });
    }
    render() {
        const {handleSubmit } = this.props;
        return (
            <div className="row">
              <Header title="PROFILE" />
              <div className="col-xs-12">
                <div className="text-xs-right">
                  <Link to="/profile/">BACK</Link>
                </div>
              </div>
              <div className="col-xs-9 form-wrapper">
              <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                  name="firstname"
                  type="text"
                  lable="FIRSTNAME"
                  component={InputComponent}
                  placeholder="firstname"
                />
                <Field
                  name="lastName"
                  type="text"
                  lable="LASTNAME"
                  component={InputComponent}
                  placeholder="lastname"
                />
                <Field
                  name="repEmail"
                  type="email"
                  lable="EMAIL"
                  classname="col-lg-6"
                  component={InputComponent}
                  placeholder="email"
                />
                <Field
                  name="repOfficePhone"
                  type="TEL"
                  lable="OFFICE NUMBER"
                  classname="col-lg-6"
                  component={PhoneNumber}
                  placeholder="XXX-XXX-XXXX"
                />
                <Field
                  name="repCellPhone"
                  type="TEL"
                  lable="MOBILE NUMBER"
                  classname="col-lg-6"
                  component={PhoneNumber}
                  placeholder="XXX-XXX-XXXX"
                />
                <div>
                    <br/><br/>
                        <h5>OFFICE LOCATION</h5>
                    <hr/>
                    <br/>
                </div>
                <Field
                  name="officeAddress"
                  type="ADDRESS"
                  lable="ADDRESS"
                  classname="col-lg-6"
                  component={InputComponent}
                  placeholder="street address"
                />
                <Field
                  name="repCity"
                  type="text"
                  lable="CITY"
                  classname="col-md-4"
                  component={InputComponent}
                  placeholder="city"
                />
                <Field
                  name="repState"
                  type="text"
                  lable="STATE"
                  classname="col-md-4"
                  component={InputComponent}
                  placeholder="state"
                />
                <Field
                  name="repZipCode"
                  type="number"
                  lable="ZIP"
                  classname="col-lg-6"
                  component={InputComponent}
                  placeholder="zip"
                />
              <div className="col-xs-12">
                    <br />
                    <br />
                        <h5>ADMINISTRATIVE ASSISTANT INFORMATION</h5>
                        <p>(if applicble)</p>
                    <hr/>
                    <br/>
                </div>
                <Field
                  name="repAdminName"
                  type="text"
                  lable="NAME"
                  classname="col-lg-6"
                  component={InputComponent}
                  placeholder="NAME"
                />
                <Field
                  name="repAssistantEmail"
                  type="email"
                  lable="EMAIL"
                  classname="col-lg-6"
                  component={InputComponent}
                  placeholder="EMAIL"
                />
                <Field
                  name="repAdminPhone"
                  type="TEL"
                  lable="PHONE"
                  classname="col-lg-6"
                  component={PhoneNumber}
                  placeholder="XXX-XXX-XXXX"
                />
                <br/><br/>
                <div className="col-xs-12" >
                    <button type="submit" className="btn btn-primary">UPDATE</button>
                    <Link to="/profile/" className="btn btn-danger">CANCEL</Link>
                </div>
              </Form>
            </div>
            </div>
        );
    }
}


function validate(values) {
    const errors = {};
    let repStateErr = isValidState(values.repState)
    let zipErr = isValidZip(values.repZipCode);
    let examDateErr = isValidExamDate(values.examDate);

    if (!values.firstname) {
        errors.firstname = 'invalid firstname';
    }
    if (!values.lastName) {
        errors.lastName = 'Invalid lastname';
    }
    if (!values.officeAddress) {
      errors.officeAddress = 'Office address empty';
    }
    if (!values.repCity) {
      errors.repCity = 'city required';
    }
    if (repStateErr) {
      errors.repState = repStateErr;
    }
    if (zipErr) {
      errors.repZipCode = zipErr;
    }
    if (!values.repAdminName) {
      errors.repAdminName = 'Invalid Name';
    }
    if (!values.repOfficePhone) {
      errors.repOfficePhone = 'Empty office phone number';
    } else if (!isValidPhoneNumber(values.repOfficePhone)){
      errors.repOfficePhone = 'Invalid office phone number' ;
    }
    if (!values.repCellPhone) {
      errors.repCellPhone = 'Empty cellphone number';
    } else if (!isValidPhoneNumber(values.repCellPhone)){
      errors.repCellPhone = 'Invalid cellphone number' ;
    }
    if (!values.repEmail) {
      errors.repEmail = 'Invalid email';
    }
    if (!values.repAdminPhone) {
      errors.repAdminPhone = 'Empty cellphone number';
    } else if (!isValidPhoneNumber(values.repAdminPhone)){
      errors.repAdminPhone = 'Invalid cellphone number' ;
    }
    if (!values.repAssistantEmail) {
      errors.repAssistantEmail = 'Invalid email';
    }
    return errors;
}

//connect first argument is mapStatetoProps, 2nd is mapDipatchToProps
// reduxForm: 1st is form config, 2nd is mapDipatchToProps, 3rd is mapDispatchToProps
const mapStateToProps = (state) => ({
    // ...
});

const mapDispatchToProps = (dispatch)  => ({
    createRepInfo: (props) => { return dispatch(createRepInfo(props)) }
});

export default reduxForm({
    form: "PostsNewForm",
    validate
}) (connect(mapStateToProps, mapDispatchToProps)(PostProfile));
