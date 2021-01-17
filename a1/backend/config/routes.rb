Rails.application.routes.draw do
  resources :links
  devise_for :users, defaults: { format: :json }, controllers: {
    sessions: 'auth/sessions',
    registrations: 'auth/registrations'
  }
  get '/:short_code', to: 'links#redirect'
  root to: 'root#root'
end
