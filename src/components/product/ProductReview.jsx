import React from 'react'

const ProductReview = ({reviews}) => {
  return (
    <div class="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
                    {reviews.map(item=>
                        <div class="review-card my-3" key={item._id}>
                        <div class="rating-outer">
                            <div class="rating-inner" style={{width: `${item.ratings*20}%`}}></div>
                        </div>
                        <p class="review_user">{item.user.name}</p>
                        <p class="review_comment">{item.comment}</p>

                        <hr />
                    </div>
                    )}
        </div>
  )
}

export default ProductReview
