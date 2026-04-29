def disaster_mode():
    """
    This function simulates disaster mode alerts.
    Returns a JSON-like dictionary with disaster status and priority.
    """
    # Example alert data
    alert = {
        "status": "Disaster mode active",
        "priority": "high",
        "message": "Emergency situation detected! Prioritize critical notifications.",
        "actions": [
            "Notify medical staff",
            "Enable high-priority alerts",
            "Ensure continuous patient monitoring",
            "Check blood bank and emergency supplies"
        ]
    }
    
    return alert
