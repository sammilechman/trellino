json.extract! board, :id, :title, :created_at, :updated_at
json.lists board.lists.sort_by(&:rank), partial: 'api/lists/list', as: :list
