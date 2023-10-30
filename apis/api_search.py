from bottle import post, response, request
import x
import json
import traceback

##############################


@post("/api-search")
def _():
    try:
        db = x.db()
        searchInput = request.forms.search_field
        response.set_header("Content-type", "application/json")
        sql_search_param_users = f'user_username: {searchInput}* OR user_first_name: {searchInput}* OR user_last_name: {searchInput}*'
        sql_search_param_trends = f'trend_topic: {searchInput}*'
        # sql_search_param_users = f'user_username: {searchParams} * OR user_first_name: {searchParams} * OR user_last_name: {searchParams}*
        searchResults_users = db.execute(
            'SELECT * FROM searchUsers WHERE searchUsers MATCH ?', (sql_search_param_users,)).fetchall()
        searchResults_trends = db.execute(
            'SELECT * FROM searchTrends WHERE searchTrends MATCH ?', (sql_search_param_trends,)).fetchall()
        searchResults_final = searchResults_users + searchResults_trends

        if searchResults_users == None:
            raise Exception(400, "No results found")
        db.commit()
        return {"info": "ok", "message": searchResults_final}
    except Exception as e:
        if "db" in locals():
            db.rollback()
        try:  # Controlled exception, usually comming from the x file
            response.status = e.args[0]
            return {"info": e.args[1]}
        except:  # Something unknown went wrong
            if "users.user_email" in str(e):
                response.status = 400
                traceback.print_exc()
                return {"info": "user_email already exists"}
            if "users.user_phone" in str(e):
                response.status = 400
                return {"info": "user_phone already exists"}
            # unknown scenario
            response.status = 500
            return {"info": str(e)}
    finally:
        if "db" in locals():
            db.close()
