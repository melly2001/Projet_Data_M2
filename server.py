from flask import Flask, jsonify, request
from flask_cors import CORS
from src.finance import get_rendement_multi_actif, get_stats_df,add_acwi_reference
from src.date_utils import string_to_date
from src.plot import get_plot_adj_close,get_plot_rendement,get_plot_investissement, get_table_stats,get_plot_prediction_rendement,convert_plotly_to_json

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({'message': 'Hello from Flask!'})
    
@app.route('/api/get_all_data',methods=['POST'])
def get_all_data():
    # try:
    data = request.get_json()
    
    dateDebut = data.get('dateDebut')
    dateFin = data.get('dateFin')
    investInit = data.get('investInit')
    investRecu = data.get('investRecu')
    listActifs = data.get('listActifs')

    actifs=[actif['nom'] for actif in listActifs]
    pourcentages_actifs=[int(actif['pourcent']) for actif in listActifs]
    date_debut = string_to_date(dateDebut)
    date_fin = string_to_date(dateFin)
    montant_initial = int(investInit)
    montant_recurrent = int(investRecu)

    df_multi_actifs=get_rendement_multi_actif(liste_actifs=actifs, liste_pourcentage_actifs=pourcentages_actifs, date_debut=date_debut, date_fin=date_fin, montant_initial=montant_initial, montant_recurrent=montant_recurrent)
    df_stats=get_stats_df(df_multi_actifs)
    df_multi_actifs=add_acwi_reference(df_multi_actifs=df_multi_actifs, date_debut=date_debut, date_fin=date_fin, montant_initial=montant_initial, montant_recurrent=montant_recurrent)
    
    df_multi_actifs=df_multi_actifs.dropna()

    figures={
        "1-plot_rendement": get_plot_rendement(df_multi_actifs),
        "2-plot_investissement": get_plot_investissement(df_multi_actifs.drop(labels="ACWI",axis=1)),
        "3-table_stats": get_table_stats(df_stats),
        "4-plot_prediction_rendement": get_plot_prediction_rendement(df_multi_actifs),
        "5-adj_close_plot": get_plot_adj_close(df_multi_actifs),
    }

    json_figures = {key: convert_plotly_to_json(plot) for key, plot in figures.items()}
    
    return jsonify({'success': 'true', 'json_figures': json_figures})

    # except:
    #     return jsonify({'success': 'false'})

if __name__ == '__main__':
    app.run(debug=True)
