import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase";
import PropTypes from "prop-types";
