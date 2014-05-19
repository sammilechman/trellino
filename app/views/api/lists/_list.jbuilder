json.extract! list, :id, :title, :rank, :board_id, :created_at, :updated_at
json.cards list.cards.sort_by(&:rank), partial: 'api/cards/card', as: :card
