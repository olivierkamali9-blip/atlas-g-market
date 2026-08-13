import React, { useState } from 'react';

interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface SellerRatingViewProps {
  sellerName?: string;
  sellerId?: string;
  initialRating?: number;
  totalReviewsCount?: number;
  onClose?: () => void;
}

export const SellerRatingView: React.FC<SellerRatingViewProps> = ({
  sellerName = 'Vendeur Pro',
  sellerId = 'user-seller-1',
  initialRating = 4.8,
  totalReviewsCount = 12,
  onClose,
}) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      authorName: 'Sami K.',
      rating: 5,
      comment: 'Transaction parfaite ! Vendeur très sérieux et à l\'écoute.',
      createdAt: '12 août 2026',
    },
    {
      id: '2',
      authorName: 'Elena V.',
      rating: 4,
      comment: 'Article reçu très rapidement et en parfait état.',
      createdAt: '10 août 2026',
    },
  ]);

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      authorName: authorName.trim() || 'Acheteur Atlas',
      rating,
      comment: comment.trim(),
      createdAt: 'Aujourd\'hui',
    };

    setReviews([newReview, ...reviews]);
    setComment('');
    setAuthorName('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const renderStars = (count: number, interactive = false) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        disabled={!interactive}
        onClick={() => interactive && setRating(star)}
        onMouseEnter={() => interactive && setHoverRating(star)}
        onMouseLeave={() => interactive && setHoverRating(0)}
        style={{
          background: 'none',
          border: 'none',
          fontSize: interactive ? '24px' : '18px',
          color: star <= (interactive ? (hoverRating || rating) : count) ? '#f59e0b' : '#d1d5db',
          cursor: interactive ? 'pointer' : 'default',
          padding: '0 2px',
          transition: 'color 0.15s ease-in-out',
        }}
      >
        ★
      </button>
    ));
  };

  return (
    <div style={{
      maxWidth: '680px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#1f2937'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#111827' }}>
            Évaluations pour {sellerName}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827' }}>{initialRating}</span>
            <div>{renderStars(Math.round(initialRating))}</div>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>({totalReviewsCount + reviews.length - 2} avis)</span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            Fermer
          </button>
        )}
      </div>

      {/* Formulaire de dépôt d'avis */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #f3f4f6' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 600, color: '#374151' }}>
          Laisser un avis à ce vendeur
        </h3>

        {submitted && (
          <div style={{ padding: '12px', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', fontWeight: 500 }}>
            ✓ Votre avis a été publié avec succès. Merci pour votre retour !
          </div>
        )}

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
            Votre note :
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {renderStars(rating, true)}
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#4b5563', marginLeft: '8px' }}>
              {rating} / 5
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
            Votre nom / pseudo :
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Ex: Thomas B."
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '4px' }}>
            Votre commentaire :
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Racontez comment s'est déroulée la transaction..."
            required
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
            transition: 'background-color 0.2s'
          }}
        >
          Publier l'avis
        </button>
      </form>

      {/* Liste des avis clients */}
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#111827' }}>
          Avis récents ({reviews.length})
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {reviews.map((rev) => (
            <div
              key={rev.id}
              style={{
                padding: '16px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, fontSize: '15px', color: '#1f2937' }}>{rev.authorName}</span>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>{rev.createdAt}</span>
              </div>
              <div style={{ marginBottom: '8px' }}>{renderStars(rev.rating)}</div>
              <p style={{ margin: 0, fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};