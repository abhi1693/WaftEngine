/**
 *
 * Comments
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

// @material
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CommentIcon from '@material-ui/icons/ModeComment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectComment,
  makeSelectCommentLoading,
  makeSelectOne,
} from './selectors';
import { makeSelectUser } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'comments';

export const Comments = props => {
  const { commentLoading, comments, one, blog_id, user } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.clearOne();
    if (blog_id) {
      props.loadCommentRequest(blog_id);
    }
    props.setOneValue({ key: 'blog_id', value: blog_id });
  }, [blog_id]);

  const [open, setOpen] = useState(false);

  const handleComment = name => e => {
    e.persist();
    props.setOneValue({ key: name, value: e.target.value });
  };

  const handlePostComment = () => {
    props.postCommentRequest();
    setOpen(false);
  };

  const handleEditComment = id => {
    setOpen(true);
    props.loadOneRequest(id);
  };

  const handleClose = () => {
    setOpen(false);
    props.clearOne();
  };

  const handleDeleteComment = id => {
    props.deleteCommentRequest(id);
  };

  return commentLoading ? (
    <div>Loading....</div>
  ) : (
    <div>
      <h2 className="mt-4" htmlFor="comment">
        <CommentIcon /> ({comments && comments.totaldata})
      </h2>

      <div className="mt-2 p-4 shadow relative rounded pb-10 border border-gray-500 mb-10">
        <textarea
          className="appearance-none w-full outline-none resize-none"
          name="comment"
          id="comments"
          rows="5"
          placeholder="Write your comment"
          value={open ? '' : one.title}
          onChange={handleComment('title')}
        />
        <button
          className="absolute right-0 bottom-0 mr-1 mb-1 py-2 px-6 rounded mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme"
          onClick={handlePostComment}
        >
          Submit
        </button>
      </div>

      {comments &&
        comments.comment &&
        comments.comment.map(each => (
          <div key={each._id}>
            <div className="flex py-4 border-b border-dotted sans-serif">
              <img src={(user && user.avatar) || null} alt="username" />
              <div className="pl-4 flex1">
                <h5 className="font-bold">
                  {typeof each.added_by === 'string' &&
                  each.added_by === user.id
                    ? user.name
                    : each.added_by.name}
                </h5>
                <p>{each.title}</p>
                {(typeof each.added_by === 'string' &&
                  each.added_by === user.id) ||
                each.added_by._id === user.id ? (
                  <div>
                    <button
                      className="ml-8 text-gray"
                      onClick={() => handleEditComment(each._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 text-gray"
                      onClick={() => handleDeleteComment(each._id)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        ))}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="comment-edit-dialog"
      >
        <DialogTitle id="comment-edit-dialog">
          <div>
            <textarea
              name="edit-comment"
              id="edit_comment"
              cols="45"
              rows="5"
              value={one.title}
              onChange={handleComment('title')}
            />
            <button
              className="py-2 px-6 rounded mt-4 text-sm text-blue bg-blue-600 hover:bg-blue-700 btn-theme"
              onClick={handlePostComment}
            >
              Save
            </button>
          </div>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.object.isRequired,
  commentLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  comments: makeSelectComment(),
  one: makeSelectOne(),
  commentLoading: makeSelectCommentLoading(),
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(withConnect)(Comments);
