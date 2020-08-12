import React, { useState, useEffect } from 'react';
import { ReviewDTO } from '../../types/dto/ReviewDTO';
import { ReviewService } from 'src/service';

type Props = {
  productId: string;
};

const ProductReviewList: React.FC<Props> = ({ productId }) => {
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);

  useEffect(() => {
    ReviewService.findAllByProductId(productId).then(({ data }) => {
      setReviews(data);
    });
  }, []);

  const view = (review: ReviewDTO) =>
    productId.navigate(`ProductView`, {
      productId: product.id!,
    });

  return <></>;
};

export { ProductReviewList };
