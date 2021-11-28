import { memo } from 'react';

type ReviewTextareaProps = {
  handleReviewAdding: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isPending: boolean;
  review: string,
}

function ReviewTextarea({ handleReviewAdding, isPending, review }: ReviewTextareaProps): JSX.Element {
  return (
    <textarea
      className="reviews__textarea form__textarea"
      id="review"
      name="review"
      placeholder="Tell how was your stay, what you like and what can be improved"
      value={review}
      onChange={handleReviewAdding}
      disabled={isPending}
      minLength={50}
      data-testid="form-textarea"
    >
    </textarea>
  );
}

export default memo(ReviewTextarea);
