package com.b107.interview.domain.review.repository;

import com.b107.interview.domain.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(value = "select r from Review r join fetch r.resume rs where r.user.userId = :userId and rs.companyName like concat('%', coalesce(:keyword, ''), '%')",
            countQuery = "select count(r) from Review r join r.resume rs where r.user.userId = :userId and rs.companyName like concat('%', coalesce(:keyword, ''), '%')")
    Page<Review> findAllByUserIdAndCompanyName(Pageable pageable, Long userId, String keyword);

    @Query(value = "select r from Review r join fetch r.resume where r.reviewId = :reviewId")
    Optional<Review> findByIdJoinFetch(Long reviewId);
}
